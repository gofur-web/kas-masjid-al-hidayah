
export default async function handler(req, res) {
  const scriptUrl =
    'https://script.google.com/macros/s/AKfycbyJ89Y5A-sWXMhz0tCYB3oCFrxMrDiGYMagthBgvseYc_Ro1ShsNBsVc064nZpsd9xq/exec';

  try {

    // =========================
    // REQUEST GET
    // =========================
    if (req.method === 'GET') {
      const action = req.query.action || 'dashboard';

      if (!['dashboard', 'grafik'].includes(action)) {
        return res.status(400).json({
          success: false,
          error: 'Action tidak tersedia'
        });
      }

      const url = new URL(scriptUrl);

      url.searchParams.set('action', action);

      // Teruskan tahun untuk grafik
      if (action === 'grafik' && req.query.tahun) {
        url.searchParams.set('tahun', req.query.tahun);
      }

      const response = await fetch(url.toString());
      const data = await response.json();

      return res.status(200).json(data);
    }

    // =========================
    // REQUEST POST
    // =========================
    if (req.method === 'POST') {
      const body = req.body || {};

      if (![
        'loginDKM',
        'simpanTransaksi',
        'getRiwayatDKM',
        'editTransaksi',
        'hapusTransaksi',
         'getInformasiDKM',
        'tambahInformasiDKM',
        'editInformasiDKM',
        'hapusInformasiDKM'
      ].includes(body.action)) {
        return res.status(400).json({
          success: false,
          error: 'Action tidak tersedia'
        });
      }

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        redirect: 'follow'
      });

      const data = await response.json();

      return res.status(200).json(data);
    }

    return res.status(405).json({
      success: false,
      error: 'Metode tidak diizinkan'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

