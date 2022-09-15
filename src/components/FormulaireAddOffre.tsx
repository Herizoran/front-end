
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { Domain, JobOffer } from "../interfaces";
import { postPutDeletRequest } from "../hoooks";
interface props {
  joboffer: JobOffer |undefined;
  id:number | null;
  fermetur:()=>void;
  dataCompose:Domain[];
  change:any;
  token:string | undefined;
}

const FormulaireAddOffre: React.FC<props> = (props) => {
  const fermerFormulaire=()=>{props.fermetur(); };
  const change = props.change;
  
  const [activ,setActiv] = useState(true)
  const [number,setNumber] = useState(0)
  useEffect (()=>{
      if (number==0) {
          setNumber(number+1);
      }else{
          setActiv(activ==false)
      }
  },[change]);

  const formik = useFormik({
    initialValues: {
      company: (props.joboffer==undefined?"":props.joboffer.company),
      contract: (props.joboffer==undefined?"":""+props.joboffer.contract),
      description: (props.joboffer==undefined?"":""+props.joboffer.description),
      location: (props.joboffer==undefined?"":""+props.joboffer.location),
      post: (props.joboffer==undefined?"":""+props.joboffer.post),
      profile: (props.joboffer==undefined?"":""+props.joboffer.profile),
      reference: (props.joboffer==undefined?"":""+props.joboffer.reference),
    },
    validationSchema: Yup.object({
      company: Yup.string()
        .max(50, "Caractère inferieur ou egale à 50")
        .required("Requis"),
      contract: Yup.string()
        .max(50, "Caractère inferieur ou egale à 50")
        .required("Requis"),
      description: Yup.string()
        .max(500, "Caractère inferieur ou egale à 500")
        .required("Requis"),
      location: Yup.string()
        .max(50, "Caractère inferieur ou egale à 500")
        .required("Requis"),
      post: Yup.string()
        .max(50, "Caractère inferieur ou egale à 50")
        .required("Requis"),
      profile: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      reference: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
    }),
    onSubmit: (values) => {

      const objectData = {
        post: values.post,
        profile: values.profile,
        location: values.location,
        description: values.description,
        company: values.company,
        contract: values.contract,
        reference: values.reference
      };
      if (props.id==null) {
        try{
          postPutDeletRequest("/job-offers",objectData,null,true,false,()=>fermerFormulaire(),()=>fermerFormulaire(),props.token);
        } catch (error){}
      }else{
          postPutDeletRequest("/job-offers/"+props.id,objectData,null,false,true,()=>fermerFormulaire(),()=>fermerFormulaire(),props.token);
      }
      
    },
  });


  if (true) {
    return (
      <>

        <div className="fonds">
        <div className="fonds2" onClick={()=>{props.fermetur()}}></div>
          <div className="form_fondsDrink">
            <button className="btn_cancel" onClick={()=>{props.fermetur()}}>
              X
            </button>
            <div className="titels">
              {'      '}<h2>FORMULAIRE</h2>
            </div>
            <form
              action=""
              className="form_class"
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
            >
              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Description
                </label>
                <input
                    id="description"
                    type="text"
                    className="input_formulaire"
                    placeholder="Veuillez entrer la description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                />

                {formik.errors.description ? <p> {formik.errors.description} </p> : null}
              </div>
              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Produit
                </label>
                <input
                  id="company"
                  type="text"
                  className="input_formulaire"
                  placeholder="Veuillez entrer le produit"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                />
                {formik.errors.company ? (
                  <p> {formik.errors.company} </p>
                ) : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Quantite
                </label>
                <input
                  id="location"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="Veuillez entrer la quantite"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                />

                {formik.errors.location ? <p> {formik.errors.location} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Unite
                </label>
                <input
                  id="post"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="Veuillez entrer l'unite"
                  value={formik.values.post}
                  onChange={formik.handleChange}
                />

                {formik.errors.post ? <p> {formik.errors.post} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Prix Unitaire
                </label>
                <input
                  id="profile"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="veuillez entrer le prix unitaire"
                  value={formik.values.profile}
                  onChange={formik.handleChange}
                />

                {formik.errors.profile ? <p> {formik.errors.profile} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Montant Entrant
                </label>

                <select
                    id="contract"
                    className="input_formulaire"
                    placeholder="Veuillez entrer le montant entrant"
                    value={formik.values.contract}
                    onChange={formik.handleChange}
                >
                  <option value={"TRUE"} label={"TRUE"}>
                    {"TRUE"}
                  </option>
                  <option value={"FALSE"} label={"FALSE"}>
                    {"FALSE"}
                  </option>
                </select>

                {formik.errors.contract ? <p> {formik.errors.contract} </p> : null}
              </div>
              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Montant Sortant
                </label>

                <select
                    id="contract"
                    className="input_formulaire"
                    placeholder="Veuillez entrer le montant entrant"
                    value={formik.values.reference}
                    onChange={formik.handleChange}
                >
                  <option value={"FALSE"} label={"FALSE"}>
                    {"FALSE"}
                  </option>
                  <option value={"TRUE"} label={"TRUE"}>
                    {"TRUE"}
                  </option>
                </select>

                {formik.errors.reference ? <p> {formik.errors.reference} </p> : null}
              </div>

              <button type="submit" className={"btn_envoie btn_type "}>
                {props.id==null?"Ajouter":"Modifier"}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }else{
    return(<></>)
  }
};
export default FormulaireAddOffre;
