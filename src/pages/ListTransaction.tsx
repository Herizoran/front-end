import React from 'react';
import { NavbarHeader } from '../components';
import { ProjectUrl } from '../constants';
import { postPutDeletRequest } from '../hoooks';
import {TableConstructor} from "../components/TableTransaction";

interface props{
    items: any[];
    actualisationAllData:() => void;
    setActiveUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  }
const ListTransaction: React.FC<props> = (props) => {
    const takeName = (a:any)=>{
      if (a=="true") {
        return "Disponible"
      }else{
        return "Null"
      }
    }
    return (
        <>
        <div className='background_gray' >
            {NavbarHeader(
              [
                  {name:"Listes des transactions",href: (ProjectUrl + "/list-transaction")},
              ],
              {name:"PRODUITS",href: (ProjectUrl + "/")}
            )}
          <div className='liste_tab'>
              <TableConstructor
                items={props.items}
                actualisationAllData={props.actualisationAllData}
                setActivUpdat={props.setActiveUpdate}
                colloneName= {["ID","DESCRIPTION",'DATE','ENTREE', 'SORTIE']}
                keFocus={[
                    {place:[0,null,null],funcion:(a:any)=>{return a}},
                    {place:[1,null,null],funcion:(a:any)=>{return a}},
                    {place:[2,null,null],funcion:(a:any)=>{return a}},
                    {place:[3,5,null],funcion:takeName},
                    {place:[3,6,null],funcion:takeName}
                ]}
                bouttons={[
                ]}
                title={"LISTES DES TRANSACTIONS"}
                delet={true}
              />
          </div>
        </div>
        </>
    );
};

export default ListTransaction;