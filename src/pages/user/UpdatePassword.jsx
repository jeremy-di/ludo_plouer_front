import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../_services/user.service';

const UpdatePassword = () => {
        const navigate = useNavigate();

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [err, setErr] = useState(null);
    const [ message, setMessage ] = useState("")

    const onChange = (e) => {
        setPassword({
        ...password,
        [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        userService.updateMyPassword(password)
        .then(res => {
            console.log(res.data);
            setMessage(res.data.message)
        })
        .catch(error => {
            console.error(error);
            setErr(error.response?.data?.message || "Erreur serveur");
        });
    };

    return (
        <div>
         {message && (   
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">{message || ""}</span> <a className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' href="/user/myprofil">Retour</a>
        </div>
        )}
        <h1 className='text-4xl text-center m-5 text-amber-400'>Modifier mon profil</h1>
        <div className="border sm:w-full lg:w-1/2 m-auto mt-5 p-5 rounded border-amber-400">
            {/* Form */}
            <form className="max-w-md mx-auto" onSubmit={onSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input
                type="password"
                name="oldPassword"
                value={password.oldPassword}
                onChange={onChange}
                id="oldPassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                />
                <label htmlFor="oldPassword" className="peer-focus:font-medium absolute text-sm text-gray-500">
                Ancien mot de passe
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={onChange}
                id="newPassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                />
                <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500">
                Nouveau mot de passe
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={onChange}
                id="confirmPassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                />
                <label htmlFor="confirmPassword" className="peer-focus:font-medium absolute text-sm text-gray-500">
                Confirmer le nouveau mot de passe
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

export default UpdatePassword;