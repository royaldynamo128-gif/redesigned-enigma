import React from 'react';
import HomePage from './components/HomePage';
import Lobby from './components/Lobby';
import Meeting from './components/Meeting';
import { useAppNavigation } from './hooks/useAppNavigation';
import { useLocalMedia } from './hooks/useLocalMedia';
import { useMeetingStore } from './hooks/useMeetingStore';

const App: React.FC = () => {
  const {
    appState,
    userName,
    setUserName,
    meetingLink,
    handleCreateMeeting,
    handleJoinWithLink,
    navigateToMeeting,
    goHome,
  } = useAppNavigation();

  const { localStream, mediaError } = useLocalMedia(appState === 'lobby' || appState === 'meeting');

  const {
    meetingState,
    dispatch,
    isAdmin,
  } = useMeetingStore(
    appState === 'meeting',
    userName,
    localStream,
    goHome,
  );

  const localParticipant = meetingState.participants.find(p => p.isLocal);

  const handleJoinMeeting = () => navigateToMeeting();
  const handleToggleMute = () => dispatch({ type: 'toggle_mute' });
  const handleToggleCamera = () => dispatch({ type: 'toggle_camera' });
  const handleLeaveMeeting = () => dispatch({ type: 'leave_meeting' });

  const renderContent = () => {
    switch (appState) {
      case 'meeting':
        return (
          <Meeting
            participants={meetingState.participants}
            chatMessages={meetingState.chatMessages}
            pdfFileUrl={meetingState.pdfFileUrl}
            bookmarks={meetingState.bookmarks}
            isAdmin={isAdmin}
            isMuted={localParticipant?.isMuted ?? false}
            isCameraOff={localParticipant?.isCameraOff ?? false}
            toggleMute={handleToggleMute}
            toggleCamera={handleToggleCamera}
            onLeaveMeeting={handleLeaveMeeting}
            dispatch={dispatch}
          />
        );
      case 'lobby':
        return (
          <Lobby
            userName={userName}
            setUserName={setUserName}
            onJoinMeeting={handleJoinMeeting}
            localStream={localStream}
            mediaError={mediaError}
            meetingLink={meetingLink}
          />
        );
      default:
        return (
          <HomePage
            userName={userName}
            setUserName={setUserName}
            onCreateMeeting={handleCreateMeeting}
            onJoinWithLink={handleJoinWithLink}
          />
        );
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white">
      {renderContent()}
    </div>
  );
};

export default App;