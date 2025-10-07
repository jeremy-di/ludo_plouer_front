import React, { useEffect, useState } from 'react';
import { activityService } from '../../_services/activity.service';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateActivity = () => {
    const { id } = useParams()

    const navigate = useNavigate();
  
    const [infos, setInfos] = useState({
    nbOfChildrens: ""
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);

    // Récupérer les infos actuelles de l'utilisateur connecté
    useEffect(() => {
    activityService.getOneActivity(id)
        .then(res => {
        setInfos({
            nbOfChildrens: res.data.nbOfChildrens || ""
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
    activityService.updateActivity(id, {
    nbOfChildrens: infos.nbOfChildrens.trim()
    })
        .then(res => {
        navigate('/activity/list');
        })
        .catch(error => {
        console.error(error);
        setErr(error.response?.data?.message || "Erreur serveur");
        });
    };

    if (loading) return <p className="text-center">Chargement...</p>;

    return (
    <div>
        <h1 className='text-4xl text-center m-5 text-amber-400'>Modifier un membre</h1>
        <div className="border sm:w-full lg:w-1/2 m-auto mt-5 p-5 rounded border-amber-400">
        {/* Form */}
                    <form className="max-w-md mx-auto" onSubmit={onSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="nbOfChildrens" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nombre d'enfants</label>
                        <select id="nbOfChildrens" name="nbOfChildrens" value={infos.nbOfChildrens} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Choisir un nombre</option>
                            <option key="1" value="1">1</option>
                            <option key="2" value="2">2</option>
                            <option key="3" value="3">3</option>
                            <option key="4" value="4">4</option>
                            <option key="5" value="5">5</option>
                            <option key="6" value="6">6</option>
                            <option key="7" value="7">7</option>
                            <option key="8" value="8">8</option>
                            <option key="9" value="9">9</option>
                            <option key="10" value="10">10</option>
                        </select>
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
                    </div>
                    </form>
                    {/* Form */}
        </div>
    </div>
    );
};

export default UpdateActivity;