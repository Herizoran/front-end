
import { newApplication, newJobOffer, ProjectUrl} from '../constants';
import background from "./../assets/images/wallpaper-gold-backround.jpg";
import { useEffect, useRef, useState } from "react";
import { axiosGetWithPage, axiosGget, login } from '../hoooks';
import { ConfirmAplication, Load, NavbarHeader } from '../components';
import { Application, Domain, JobOffer } from '../interfaces';

  interface RouterProps {
      history: string;
  }
  
  const Landing = () => {
    const [page, setPage] = useState(1);
    const [valuNumbur, setValuNumbur] = useState<number>(5);
    const [domaine, setDomaine] = useState<number|null>(null)
    const [aplication, setAplication] = useState<Application[]>([newApplication]);
    const [job, setJob] = useState<JobOffer[]>([newJobOffer]);
    const [loadJob, setLoadJob] = useState<number>(0);
    const [activLoad, setActivLoad] = useState<boolean>();
    useEffect(()=>{
        if (domaine == null){
            axiosGetWithPage("/job-offers",page,valuNumbur,token,setJob,()=>{},()=>{})//(endPoint: string, page: number, page_sise: number, token: string | undefined, takingData: React.Dispatch<React.SetStateAction<any[]>>, functionIfTrue: (() => void)
        }else {
            axiosGetWithPage("/domains/"+domaine+"/job-offers",page,valuNumbur,token,setJob,()=>{},()=>{})//(endPoint: string, page: number, page_sise: number, token: string | undefined, takingData: React.Dispatch<React.SetStateAction<any[]>>, functionIfTrue: (() => void)
        }
    },[loadJob,page,valuNumbur,domaine])
    
    const [dataCompose, setDataCompose] = useState<Domain[]>([]);
    useEffect(() => {
        if (activLoad!=undefined) {
            setActivLoad(true);
        } 
        axiosGget("/domains/?page=1&page_size=100",undefined,setDataCompose,null,()=>{setActivLoad(false)});
    }, [])

    const [maxDomain, setMaxDomain] = useState<Domain>();
    useEffect(() => {
        axiosGget("/domains-applied",undefined,setMaxDomain,null,()=>{setActivLoad(false);
        });
    }, [])
    const [maxDomainCount, setMaxDomainCount] = useState<number>();
    useEffect(() => {
        axiosGget("/domains-applied/count",undefined,setMaxDomainCount,null,()=>{setActivLoad(false);
        });
    }, [])
    
    const [password, setPassword] = useState<string>("");
    const [token, setToken] = useState<string>("");


  const navigate = ()=>{
    window.location.href=(ProjectUrl+"/Ranking");
  }

  const functionLog = (username:string, password:string) => {

    login(username, password, navigate, setToken).then((re)=>{
    })
  }
  return (
    <>
        {NavbarHeader(
              [
                  {name:"Listes des transactions",href: (ProjectUrl + "/list-transaction")},
              ],
              {name:"CASH",href: (ProjectUrl + "/")}
          )}
        {
            
        <div className=" contereAllLanding d-flex flex-column bd-highlight " >
            <div className="contereAllLoginb" style={{
                backgroundImage: 'url('+background+')',
                backgroundSize: "cover",
                height: "100vh",
                
              }}>
                <h1>Gestion de votre comptabilite</h1>
                <a className='section-btn' href='/register'>S'enregister</a>
            </div>
                <footer id="footer">
                  <div className="container">
                       <div className="row">
                            <div className="col">
                                 <div className="footer-info">
                                      <div className="footer-content"><p> Gestion de compte d'entreprise</p></div>
                                      <div className="copyright-text">
                                           <p > &copy; HEI - SARLU</p>
                                      </div>
                                      <p >Email: <a href="mailto:contact@account.mg">contact@hei.school</a> • Tel: +261 34 94 041 16 • <a href="https://www.google.com/maps/place/Haute+School+It+%5BHei%5D/@-18.8707638,47.5347298,15z/data=!4m5!3m4!1s0x0:0x73f917bb47615aa0!8m2!3d-18.8707923!4d47.5347803" target="_blank">2J 161R Ivandry, Antananarivo</a></p>
                                 </div>
                            </div>
                       </div>
                  </div>
                </footer>
        </div>
        }
        {activLoad==true?Load(()=>{setActivLoad(false)}):<></>}
    </>
  );
}

export default Landing;
