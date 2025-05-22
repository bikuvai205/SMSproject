export async function generateId(req, res)  {
  try {
    const regId = req.params.id;

    // Generate credentials
    const instituteId = Math.floor(100000 + Math.random() * 900000).toString();
    const superAdminId = Math.floor(100000 + Math.random() * 900000).toString();
    const password = 'superadmin123';
   console.log('Generated credentials:', { instituteId, superAdminId, password });
    // Check if already verified
    const alreadyExists = await ActiveUser.findOne({ linkedRegistrationId: regId });
    if (alreadyExists) {
      return res.status(400).json({ error: 'Already verified.' });
    }

    // Save to ActiveUsers collection
    const user = new ActiveUser({
      instituteId,
      superAdminId,
      password,
      linkedRegistrationId: regId
    });

    await user.save();

    // Respond with credentials
    res.json({ instituteId, superAdminId, password });
  } catch (err) {
    console.error('Verification Error:', err);
    res.status(500).json({ error: 'Server error during verification' });
  }
}