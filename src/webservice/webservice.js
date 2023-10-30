const graphQLURL = 'https://yourline-server.duckdns.org/query';

async function queryFetch(query, variables) {
  try {
    const response = await fetch(graphQLURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

export { queryFetch };
