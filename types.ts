export interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isCameraOff: boolean;
  isLocal?: boolean;
  isHost?: boolean;
  stream?: MediaStream;
  joinTime: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  sticker?: string;
}

export interface AttendanceRecord {
  id: string; // Use participant ID for a stable key
  name: string;
  joinTime: Date;
  leaveTime: Date | null;
}

// --- Meeting Store & Broadcast Channel Types ---

export interface MeetingState {
  participants: Participant[];
  chatMessages: ChatMessage[];
  pdfFileUrl: string | null;
  bookmarks: number[];
  attendanceLog: AttendanceRecord[];
}

// Defines all possible messages that can be sent over the BroadcastChannel
export type BroadcastMessage =
  | { type: 'user-joined'; payload: { participant: Participant } }
  | { type: 'user-left'; payload: { participantId: string } }
  | { type: 'state-share'; payload: { state: MeetingState } }
  | { type: 'state-update'; payload: { participant: Participant } }
  | { type: 'chat-message'; payload: { message: ChatMessage } }
  | { type: 'pdf-update'; payload: { pdfFileUrl: string | null, bookmarks: number[] } };


// Defines all actions that can be dispatched to the meeting store reducer
export type MeetingAction =
  // Lifecycle & Initialization
  | { type: 'initialize_state'; payload: { localParticipant: Participant, isCreator: boolean } }
  | { type: 'leave_meeting' }
  | { type: 'handle_broadcast_message'; payload: { message: BroadcastMessage } }
  // Local User Actions
  | { type: 'toggle_mute' }
  | { type: 'toggle_camera' }
  | { type: 'update_local_stream'; payload: { stream: MediaStream } }
  // Meeting Features
  | { type: 'send_message'; payload: { message: string, stickerId?: string } }
  | { type: 'upload_pdf'; payload: { file: File } }
  | { type: 'update_bookmarks'; payload: { bookmarks: number[] } }
  | { type: 'mute_participant'; payload: { participantId: string } };