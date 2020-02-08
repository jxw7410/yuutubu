export const uploadToS3 = (blob, file, progressHandler) => (
  new Promise((resolve, reject) => {
    $.ajax({
      xhr: progressHandler,
      url: blob.direct_upload.url,
      type:'PUT',
      headers: blob.direct_upload.headers,
      contentType: file.type,
      data: file,
      cache: false,
      processData: false,
    })
    .then(() => resolve())
    .fail( err => reject(err))
  })
)



