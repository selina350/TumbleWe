export const getSubdomainFromBrowser = () => {
  // Get the full hostname from the current URL
  const fullHostname = window.location.hostname;

  // Split the hostname into an array using dot (.) as the separator
  const hostnameParts = fullHostname.split(".");

  // Check if there are more than two parts in the hostname
  // (subdomain.domain.tld will have at least three parts)
  if (hostnameParts.length >= 3) {
    // Get the subdomain, which is the first part of the hostname
    const subdomain = hostnameParts[0];

    return subdomain;
  } 
};

export const getHostReplacedSubdomainWith = (subdomain) => {
  const currentSubdomain = location.host.split(".")[0];
  const newHost = location.host.replace(
    `${currentSubdomain}.`,
    `${subdomain}.`
  );
  return newHost;
};
