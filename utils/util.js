export const fetchQuery = async (query, variables) => {
  let response = await fetch("https://api-ap-south-1.graphcms.com/v2/cl4jeopdn4t0401xohuhxavfd/master", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables:variables
    })
  })
  const data = await response.json()
  return data.data
}