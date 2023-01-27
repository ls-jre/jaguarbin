const formatPath = (binId: string, path: string) => {
  const endpoint = `/webhooks/${binId}`;
  let displayPath = path;
  if (displayPath.startsWith(endpoint)) {
    displayPath = displayPath.slice(endpoint.length);
  }

  return displayPath || '/';
};

export default formatPath;
