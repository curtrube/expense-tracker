const error = async (req, res) => {
  res.json({ message: 'Error route not found' });
};

export default error;
