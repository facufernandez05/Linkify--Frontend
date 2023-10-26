export function Footer () {
  return (
    <footer id='contacto' className='flex items-center justify-between gap-10 p-6 text-white bg-black border-t shadow-2xl'>

      <p className="text-xs">Copyright © 2023 Linkify.</p>

      <section className="flex items-center gap-4 md:gap-10">
      {socialMediaIcons?.map(icon => (
        <a href={icon.href} target='_blank' key={icon.alt} className="transition-transform transform hover:scale-110">
          <i className={icon.icon} aria-label={icon.alt} title={icon.alt} style={{ fontSize: '2rem' }}></i>
        </a>
      ))}
      </section>

    </footer>
  )
}

const socialMediaIcons = [
  {
    alt: 'Instagram',
    href: 'https://www.instagram.com/linkifyoficial/',
    icon: 'fa-brands fa-instagram'
  },
  {
    alt: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61552685872214',
    icon: 'fa-brands fa-square-facebook'
  },
  {
    alt: 'Youtube',
    href: 'https://youtube.com/@Linkify8',
    icon: 'fa-brands fa-youtube'
  },
  {
    alt: 'Twitter',
    href: 'https://twitter.com/LinkifyOficial',
    icon: 'fa-brands fa-x-twitter'
  }
]
