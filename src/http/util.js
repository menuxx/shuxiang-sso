
export const getFilename = (contentDisposition) => {
  var filename = "";
  var disposition = contentDisposition
  if (disposition && disposition.indexOf('inline') !== -1) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    var matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
  }
  return filename
}
