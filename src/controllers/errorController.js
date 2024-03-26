const error = async (req, res) => {
  // This probably shouldn't return a http 200
  res.json({ message: 'Error route not found' });
};

export default error;
