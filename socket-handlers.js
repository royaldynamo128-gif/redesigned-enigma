class SocketHandler {
    constructor(io) {
        this.io = io;
        this.meetings = new Map();
        this.setupSocketHandlers();
    }

    setupSocketHandlers() {
        this.io.on('connection', (socket) => {
            console.log(`User connected: ${socket.id}`);

            // Join meeting room
            socket.on('join-meeting', (data) => {
                const { meetingId, userName } = data;

                if (!meetingId || !userName) {
                    socket.emit('error', { message: 'Meeting ID and user name are required' });
                    return;
                }

                socket.join(meetingId);
                socket.meetingId = meetingId;
                socket.userName = userName;

                // Add participant to meeting
                if (!this.meetings.has(meetingId)) {
                    this.meetings.set(meetingId, {
                        participants: [],
                        chatMessages: []
                    });
                }

                const meeting = this.meetings.get(meetingId);
                const participant = {
                    id: socket.id,
                    name: userName,
                    isLocal: false,
                    isMuted: false,
                    isCameraOff: false
                };

                meeting.participants.push(participant);

                // Notify others in the meeting
                socket.to(meetingId).emit('participant-joined', participant);

                // Send current meeting state to new participant
                socket.emit('meeting-info', {
                    participants: meeting.participants,
                    chatMessages: meeting.chatMessages
                });

                console.log(`${userName} joined meeting ${meetingId}`);
            });

            // Handle WebRTC signaling
            socket.on('offer', (data) => {
                socket.to(data.target).emit('offer', {
                    offer: data.offer,
                    from: socket.id
                });
            });

            socket.on('answer', (data) => {
                socket.to(data.target).emit('answer', {
                    answer: data.answer,
                    from: socket.id
                });
            });

            socket.on('ice-candidate', (data) => {
                socket.to(data.target).emit('ice-candidate', {
                    candidate: data.candidate,
                    from: socket.id
                });
            });

            // Handle chat messages
            socket.on('chat-message', (data) => {
                const { message } = data;
                const meetingId = socket.meetingId;

                if (!meetingId) {
                    socket.emit('error', { message: 'Not in a meeting' });
                    return;
                }

                const chatMessage = {
                    id: Date.now().toString(),
                    sender: socket.userName,
                    message,
                    timestamp: new Date()
                };

                const meeting = this.meetings.get(meetingId);
                if (meeting) {
                    meeting.chatMessages.push(chatMessage);
                }

                this.io.to(meetingId).emit('chat-message', chatMessage);
            });

            // Handle participant actions
            socket.on('toggle-mute', () => {
                const meetingId = socket.meetingId;
                if (!meetingId) return;

                const meeting = this.meetings.get(meetingId);
                if (meeting) {
                    const participant = meeting.participants.find(p => p.id === socket.id);
                    if (participant) {
                        participant.isMuted = !participant.isMuted;
                        socket.to(meetingId).emit('participant-updated', participant);
                    }
                }
            });

            socket.on('toggle-camera', () => {
                const meetingId = socket.meetingId;
                if (!meetingId) return;

                const meeting = this.meetings.get(meetingId);
                if (meeting) {
                    const participant = meeting.participants.find(p => p.id === socket.id);
                    if (participant) {
                        participant.isCameraOff = !participant.isCameraOff;
                        socket.to(meetingId).emit('participant-updated', participant);
                    }
                }
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                const meetingId = socket.meetingId;

                if (meetingId) {
                    const meeting = this.meetings.get(meetingId);
                    if (meeting) {
                        // Remove participant from meeting
                        meeting.participants = meeting.participants.filter(p => p.id !== socket.id);

                        // Notify others
                        socket.to(meetingId).emit('participant-left', socket.id);

                        // Clean up empty meetings
                        if (meeting.participants.length === 0) {
                            this.meetings.delete(meetingId);
                        }
                    }
                }

                console.log(`User disconnected: ${socket.id}`);
            });
        });
    }
}

module.exports = SocketHandler;
