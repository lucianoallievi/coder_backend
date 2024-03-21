function notFoundOne(one) {
  if (!one) {
    const error = new Error("There is no document.");
    error.statusCode = 404;
    throw error;
  }
}

export default notFoundOne;
