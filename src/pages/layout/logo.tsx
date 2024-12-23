import { Link } from 'react-router-dom'
import TestLogo from "@/assets/Logo-Test.png"

const SiteLogo = ({ className }: { className: string }) => {
  return (

    <Link to="/">
      <img
        src={TestLogo}
        alt="logo-img"
        className={className}
      />
    </Link>
  )
}

export default SiteLogo