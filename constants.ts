import type { Participant } from './types';

export const MOCK_PARTICIPANTS: Participant[] = [
    { id: '1', name: 'Aarav Sharma', isMuted: false, isCameraOff: false, isHost: false, joinTime: new Date() },
    { id: '2', name: 'Isha Patel', isMuted: true, isCameraOff: false, isHost: false, joinTime: new Date() },
    { id: '3', name: 'Rohan Gupta', isMuted: false, isCameraOff: true, isHost: false, joinTime: new Date() },
    { id: '4', name: 'Priya Singh', isMuted: false, isCameraOff: false, isHost: false, joinTime: new Date() },
    { id: '5', name: 'Vikram Reddy', isMuted: true, isCameraOff: true, isHost: false, joinTime: new Date() },
    { id: '6', name: 'Anjali Desai', isMuted: false, isCameraOff: false, isHost: false, joinTime: new Date() },
];

export const STICKERS = [
    { id: 'radhe', text: 'Radhe 🙏' },
    { id: 'radhe-radhe', text: 'Radhe Radhe 🦚' },
    { id: 'ram-ram', text: 'Ram Ram 🏹' },
    { id: 'hare-krishna', text: 'Hare Krishna 🌸' },
];


// Deprecated: moved to components/Icons.tsx for formal icon set
export const ICONS = {
    micOn: '🎤',
    micOff: '🔇',
    cameraOn: '📹',
    cameraOff: '📷',
    book: '📚',
    participants: '👥',
    chat: '💬',
    leave: '🚪',
};
