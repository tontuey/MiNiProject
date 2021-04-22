import Link from 'next/link'

const Navbar = () => (
    <div>
        <Link href="/"><a> Home </a></Link> |
        <Link href="/register"><a> Register </a></Link>  |
        <Link href="/login"><a> Login </a></Link> | 
        <Link href="/logout"><a> Logout </a></Link> |
        <Link href="/Student"><a> Add a recipe</a></Link> 
        

    </div>
)

export default Navbar