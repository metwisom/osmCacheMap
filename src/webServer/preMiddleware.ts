function preMiddleware(url?: string): string | undefined {
  if (url == undefined) {
    return undefined;
  }
  const pathBody = url.split('?');
  const path = pathBody[0];
  if (path == undefined) {
    return undefined;
  }
  return path;
}

export {preMiddleware};