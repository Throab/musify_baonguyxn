import React, { useState, useEffect, useRef } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleLikeSong } from "../../API/favoriteAPI";
import { MdOutlineWatchLater, MdOutlinePlaylistAdd } from "react-icons/md";
import { addSongToListenLater } from "../../API/listenLaterAPI";
import SearchPlaylist from "./SelectPlaylist";
import { IoShareOutline } from "react-icons/io5";
import { TbUserShare } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import ShareToolTip from "./ShareToolTip";

const SongDescription = ({
  id,
  close,
  title,
  thumbnail,
  artist,
  uploadedBy,
  likes,
  album,
  isLiked,
  onSuccess,
}) => {
  const isLongTitle = title.length + artist.length > 15;
  const isLongArtist = artist.length > 15;
  const isTitleLong = title.length > 55;
  const isAlbumLong = album.length > 15;

  const [liked, setLiked] = useState(isLiked);
  const [error, setError] = useState(null);
  const [showAddToPlaylistOption, setShowAddToPlaylistOption] = useState(false);
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [link, setLink] = useState(null);
  const [showShareToolTip, setShowShareToolTip] = useState(false);

  const searchPlaylistRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLiked(isLiked);
  }, [title, artist, uploadedBy, isLiked]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchPlaylistRef.current &&
        !searchPlaylistRef.current.contains(event.target)
      ) {
        setShowAddToPlaylistOption(false);
        setShowOtherOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const toggleLike = async () => {
    try {
      await toggleLikeSong(id);
      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.log(error.message);
    }
  };

  const AddSongToListenLater = async (id) => {
    try {
      await addSongToListenLater(id);

      onSuccess("Song added to Listen Later");
      close();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleToggleAddToPlaylist = () => {
    setShowAddToPlaylistOption((prev) => !prev);
  };

  const handleCloseSelectPlaylist = () => {
    setShowAddToPlaylistOption(false);
  };

  const goToUserProfile = (username) => {
    navigate(`/c/${username}`);
  };

  const handleShareSong = () => {
    const link = `${window.location.origin}/songid/${id}`;
    setLink(link);
  };

  return (
    <div className="fixed hidden md:block top-3 right-0 bottom-20">
      <div className="bg-musify-dark text-white flex flex-col rounded-xl items-center p-6 pb-10 relative max-h-full min-h-0 border border-gray-800 shadow-inner shadow-gray-700">
        {/* Header */}
        <div className="flex items-center">
          {/* Song title */}
          <div className={`sliding-container ${isLongTitle ? "sliding" : ""}`}>
            <div className="sliding-text">
              {title} by {artist}
            </div>
          </div>

          {/* Three dots */}
          <HiOutlineDotsHorizontal
            className="text-2xl mx-2 cursor-pointer"
            onClick={() => {
              setShowOtherOptions((prev) => !prev);
              setShowAddToPlaylistOption(false);
            }}
          />

          {/* Options menu */}
          {showOtherOptions && (
            <div
              ref={searchPlaylistRef}
              className="absolute top-10 right-2 bg-musify-dark text-white p-2 rounded-lg border border-gray-700 z-50 w-56"
            >
              {/* Go to User */}
              <button
                className="flex items-center text-gray-300 hover:text-white w-full py-2"
                onClick={() => {
                  goToUserProfile(uploadedBy);
                  setShowOtherOptions(false);
                }}
              >
                <TbUserShare size={20} className="mx-1" />
                <span>Go to {uploadedBy}</span>
              </button>

              {/* Share */}
              <button
                className="flex items-center text-gray-300 hover:text-white w-full py-2"
                onClick={() => {
                  handleShareSong();
                  setShowShareToolTip(true);
                  setShowOtherOptions(false);
                }}
              >
                <IoShareOutline size={20} className="mx-1" />
                <span>Share</span>
              </button>

              {/* Add to Listen Later */}
              <button
                className="flex items-center text-gray-300 hover:text-white w-full py-2"
                onClick={() => {
                  AddSongToListenLater(id);
                  setShowOtherOptions(false);
                }}
              >
                <MdOutlineWatchLater size={20} className="mx-1" />
                <span>Add to Listen Later</span>
              </button>

              {/* Add to Playlist */}
              <button
                className="flex items-center text-gray-300 hover:text-white w-full py-2"
                onClick={handleToggleAddToPlaylist}
              >
                <MdOutlinePlaylistAdd size={20} className="mx-1" />
                <span>Add to Playlist</span>
              </button>

              {/* Search Playlist */}
              {showAddToPlaylistOption && (
                <div className="mt-2 w-full">
                  <SearchPlaylist
                    songId={id}
                    close={handleCloseSelectPlaylist}
                    success={onSuccess}
                  />
                </div>
              )}
            </div>
          )}

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none text-2xl pt-1"
          >
            &times;
          </button>
        </div>

        {/* Image */}
        <div className="w-64 h-64 flex-col items-center justify-center mt-4">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={thumbnail ? thumbnail : Logo}
            alt={title}
            draggable="false"
          />
        </div>

        {/* Song details */}
        <div className="w-64">
          {/* Title */}
          <div
            className={`title-sliding-container ${
              isTitleLong ? "sliding" : ""
            }`}
          >
            <div className={`${isTitleLong ? "title-sliding-text" : "flex"}`}>
              <h1 className="text-xl font-bold mt-4 pb-3">{title}</h1>
            </div>
          </div>

          {/* Artist + Like */}
          <span className="flex items-center">
            <div
              className={`sliding-container ${isLongArtist ? "sliding" : ""}`}
            >
              <div
                className={`${isLongArtist ? "title-sliding-text" : "flex"}`}
              >
                <p className="text-gray-300">Artist: {artist}</p>
              </div>
            </div>

            <div onClick={toggleLike} className="ml-2 cursor-pointer">
              {liked ? (
                <FaHeart className="text-red-600" size={20} />
              ) : (
                <FaRegHeart size={20} />
              )}
            </div>
          </span>

          {/* Album */}
          <div className={`sliding-container ${isAlbumLong ? "sliding" : ""}`}>
            <div className={`${isAlbumLong ? "title-sliding-text" : "flex"}`}>
              <p className="text-gray-300">Album: {album}</p>
            </div>
          </div>

          {/* Uploaded by */}
          <p className="text-gray-300">Uploaded by: {uploadedBy}</p>

          {/* Likes */}
          <p className="text-gray-300">Likes: {likes}</p>

          {/* Error */}
          {error && error !== "No Songs are available" && (
            <h1 className="text-red-500">{error}</h1>
          )}

          {/* Share Tooltip */}
          {showShareToolTip && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 ml-24 z-[100]">
              <ShareToolTip
                link={link}
                Close={() => setShowShareToolTip(false)}
                className="fixed top-1/2 left-1/2 mb-4 mr-4"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDescription;
