export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({
        success: false,
        error: 'Metode tidak diizinkan'
      });
    }

    const action = req.query.action || 'dashboard';

    if (action !== 'dashboard') {
      return res.status(400).json({
        success: false,
        error: 'Action tidak tersedia'
      });
    }

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyJ89Y5A-sWXMhz0tCYB3oCFrxMrDiGYMagthBgvseYc_Ro1ShsNBsVc064nZpsd9xq/exec';

    const url = new URL(scriptUrl);
    url.searchParams.set('action', action);

    const response = await fetch(url.toString());
    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
