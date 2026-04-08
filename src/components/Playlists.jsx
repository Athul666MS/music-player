import React from 'react'

export function Playlists() {
  return (
    <div className="create-playlist">
      <h3>Create new playlist</h3>
      <div className="playlist-form">
        <input type="text"  placeholder='playlist name .....' className='playlist-input'/>
      </div>
    </div>
  )
}
