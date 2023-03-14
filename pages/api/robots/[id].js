export default async function handler(req, res) {
  const { id } = req.query
  console.log(id)
  const response = await fetch(`http://0.0.0.0:8000/robots/${id}`);
  const data = await response.json();

  res.status(200).json({ data: data });
}
