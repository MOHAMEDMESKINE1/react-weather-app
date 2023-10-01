import img from '../../assets/img/wallpaper.jpg'
import '../Wallpaper/Wallpaper.scss'
export default function Wallpaper(){
    return (
       <>

            <div className="  wallpaper-container position-fixed d-flex top-0 bottom-0 end-0  start-0">
                <img src={img} className='wallpaper' alt="wallpaper" />
            </div>
       </>
    )
}