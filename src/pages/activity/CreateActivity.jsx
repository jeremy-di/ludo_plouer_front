import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { activityService } from '../../_services/activity.service';
import { memberService } from '../../_services/member.service';

const CreateActivity = () => {
    let navigate = useNavigate()

    const [ members, setmembers ] = useState(null)
    const [ err1, setErr1 ] = useState(null)
    const [ loaded, setLoaded ] = useState(false)

    useEffect(() => {
        memberService.getAllMembers()
            .then(res => {
                console.log(res.data)
                setmembers(res.data)
                setLoaded(true)
            })
            .catch(error => {
                console.log(error)
                setErr(error)
                setLoaded(true)
            })
    }, [])

    const [ infos, setInfos ] = useState({
        member : "",
        nbOfChildrens : ""
    })

    const [ err, setErr ] = useState(null)

    const onChange = (e) => {
        setInfos({
            ...infos,
            [ e.target.name ] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        activityService.createActivity(infos)
            .then(res => {
                navigate('/activity/list')
            })
            .catch(error => {
                console.log(error)
                setErr(error)
            })
    }

    if ( !loaded ) {
            return (
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )
    }
    else if (err) {
        return (
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium">Erreur : {err.response.status}</span> {err.response.statusText == "Not Found" && ("Aucune ressources trouvées")}
            </div>
        )
    }
    else {
        return (
            <div>
                <h1 className='text-4xl text-center m-5 text-amber-400'>Inscrire un membre</h1>
                <div className="border sm:w-full lg:w-1/2 m-auto mt-5 p-5 rounded border-amber-400">
                    {/* Form */}
                    <form className="max-w-md mx-auto" onSubmit={onSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="member" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">membre</label>
                        <select id="member" name="member" value={infos.member} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Choisir un membre</option>
                            {members.map(member => (
                            <option key={member._id} value={member._id}>{member.lastName} {member.firstName}</option>
                            ))}
                        </select>
                    </div>
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
    }

};

export default CreateActivity;