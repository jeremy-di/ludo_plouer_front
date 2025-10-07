// src/pages/UpdateProfil.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../../_services/user.service';

const UpdateUser = () => {
    const { id } = useParams()

    const navigate = useNavigate();
  
      const [infos, setInfos] = useState({
        lastName: "",
        firstName: "",
        email: ""
      });
      const [err, setErr] = useState(null);
      const [loading, setLoading] = useState(true);
  
      // Récupérer les infos actuelles de l'utilisateur connecté
      useEffect(() => {
        userService.getOneUser(id)
          .then(res => {
            setInfos({
              lastName: res.data.lastName || "",
              firstName: res.data.firstName || "",
              email: res.data.email || ""
            });
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
            setErr("Impossible de charger vos informations.");
            setLoading(false);
          });
      }, []);
  
      const onChange = (e) => {
        setInfos({
          ...infos,
          [e.target.name]: e.target.value
        });
      };
  
      const onSubmit = (e) => {
        e.preventDefault();
        userService.updateUser(id, {
        lastName: infos.lastName.trim(),
        firstName: infos.firstName.trim(),
        email: infos.email.trim()
        })
          .then(res => {
            navigate('/');
          })
          .catch(error => {
            console.error(error);
            setErr(error.response?.data?.message || "Erreur serveur");
          });
      };
  
      if (loading) return <p className="text-center">Chargement...</p>;
  
      return (
        <div>
          <h1 className='text-4xl text-center m-5 text-amber-400'>Modifier un utilisateur</h1>
          <div className="border sm:w-full lg:w-1/2 m-auto mt-5 p-5 rounded border-amber-400">
            {/* Form */}
            <form className="max-w-md mx-auto" onSubmit={onSubmit}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="lastName"
                  value={infos.lastName}
                  onChange={onChange}
                  id="lastName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label htmlFor="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500">
                  Nom
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="firstName"
                  value={infos.firstName}
                  onChange={onChange}
                  id="firstName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500">
                  Prénom
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="email"
                  value={infos.email}
                  onChange={onChange}
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500">
                  Prénom
                </label>
              </div>
              {err && <p className="text-red-500 mb-3">{err}</p>}
              <div className='text-center'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg">
                  Modifier
                </button>
              </div>
            </form>
            {/* Form */}
          </div>
        </div>
      );
};

export default UpdateUser;
