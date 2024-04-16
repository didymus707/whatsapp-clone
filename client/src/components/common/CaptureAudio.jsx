import { useStateProvider } from "@/context/StateContext";
import React, { useRef, useState } from "react";
import { FaMicrophone, FaPauseCircle, FaTrash } from "react-icons/fa";
import { MdSend } from "react-icons/md";

function CaptureAudio({ hide }) {
  const [waveform, setWaveform] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();

  const audioRef = useRef(null);
  const waveformRef = useRef(null);
  const mediaRecordedRef = useRef(null);

  const handlePlayRecording = () => {};
  const handlePauseRecording = () => {};

  const handleStopRecording = () => {};
  const handleStartRecording = () => {};

  const sendRecording = async () => {};

  return (
    <div className="flex text-2xl w-full justify-end items-center">
      <div className="pt-1">
        <FaTrash className="text-panel-header-icon" onClick={() => hide()} />
      </div>
      <div className="mx-4 py-2 px-4 text-white text-lg flex gap-3 justify-center items-center bg-search-input-container-background rounded-full drop-shadow-lg">
        {isRecording ? (
          <div className="text-red-500 animate-pulse w-60 text-center">
            Recording <span>{recordingDuration}s</span>
          </div>
        ) : (
          <div>
            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <FaPlay onClick={handlePlayRecording} />
                ) : (
                  <FaStop onClick={handlePauseRecording} />
                )}
              </>
            )}
          </div>
        )}
        <div className="w-60" ref={waveformRef} hidden={isRecording}>
          {recordedAudio && isPlaying && (
            <span>{formatTime(currentPlaybackTime)}</span>
          )}
          {recordedAudio && !isPlaying && (
            <span>{formatTime(totalDuration)}</span>
          )}
          <audio ref={audioRef} hidden />
          <div className="mr-4">
            {!isRecording ? (
              <FaMicrophone
                className="text-red-500"
                onClick={handleStartRecording}
              />
            ) : (
              <FaPauseCircle
                className="text-red-500"
                onClick={handleStopRecording}
              />
            )}
          </div>
          <div>
            <MdSend
              title="Send"
              onClick={sendRecording}
              className="text-panel-header-icon cursor-pointer mr-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaptureAudio;
