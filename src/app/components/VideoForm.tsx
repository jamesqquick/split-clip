import React from 'react';

export default function VideoForm() {
  return (
    <form
      action="http://localhost:3000/api/video"
      encType="multipart/form-data"
      id="videoForm"
      method="POST"
    >
      <input type="file" name="video" accept="video/*" id="input-tag" />
      <hr />
      <button className="text-white">Submit</button>
    </form>
  );
}
