module.exports = {
  siteUrl: 'https://www.mragain.nl',
  generateRobotsTxt: process.env.NODE_ENV === "production",
  exclude: ['/DefferedNextScript', 
            '/EmailConfirmation', 
            '/HeadWithoutPreload',
            '/dashboard',
            '/dashboard/PictureWall',
            '/history',
	    '/account-settings',
            '/algemene-voorwaarden',
	    '/geef-een-review',
	    '/reset-je-wachtwoord',
	    '/zoek-een-reparateur',
            '/repair-management',
            '/shop-management'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.mragain.nl/dynamic-sitemap.xml',
    ],
  }
}
