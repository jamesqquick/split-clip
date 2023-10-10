import React from 'react';

export default function VideoForm() {
  return (
    <form action="/" encType="multipart/form-data" id="videoForm">
      <input type="file" name="video" accept="video/*" id="input-tag" />
      <hr />
      <button className="text-white">Submit</button>
    </form>
  );
}
