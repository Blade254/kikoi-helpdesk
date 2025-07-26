import Link from 'next/link'
import Image from 'next/image'
import Logo from './KikoiLogo.png'


export default function Navbar() {
  return (
    <nav>
      <Image
        src={Logo}
        alt="Kikoi Logo"
        width={70}
        quality={100}
        placeholder='blur'
      />
      <h1>Kikoi Helpdesk</h1>
      <Link href="/">Dashboard</Link> 
      <Link href="/tickets">Tickets</Link>
      <Link href="/tickets/create">New Ticket</Link>
    </nav>
  )
}