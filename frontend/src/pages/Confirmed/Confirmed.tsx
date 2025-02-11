import { useNavigate } from "react-router-dom"

export default function Confirmed() {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col gap-8 items-center'>
            <h1>completed!</h1>
            <h2>Thankyou, enjoy your cookies!</h2>

            <div className="hover:cursor-pointer"  onClick={ () => navigate("/") }>back to homepage</div>
        </div>
    )
}
