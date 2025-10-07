import React from 'react';

const Home = () => {
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Tableau de bord</h2>
                    </div>
                    {localStorage.getItem("token") && ( 
                    <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                            <a href="/member/create">
                                <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="/images/add_member.png" alt="Bonnie Avatar"/>
                            </a>
                            <div className="p-5">
                                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a href="/member/create">Ajouter une personne à la ludothèque</a>
                                </h3>
                            </div>
                        </div> 
                        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                            <a href="/activity/new">
                                <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="/images/add_member_activity.png" alt="Jese Avatar"/>
                            </a>
                            <div className="p-5">
                                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a href="/activity/new">Inscrire des personnes à l'activité</a>
                                </h3>
                            </div>
                        </div> 
                        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                            <a href="/member/list">
                                <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="/images/list_members.png" alt="Bonnie Avatar"/>
                            </a>
                            <div className="p-5">
                                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a href="/member/list">Liste des membres</a>
                                </h3>
                            </div>
                        </div> 
                        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                            <a href="/activity/list">
                                <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="/images/activity.png" alt="Jese Avatar"/>
                            </a>
                            <div className="p-5">
                                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a href="/activity/list">Activité en cours</a>
                                </h3>
                            </div>
                        </div> 
                          
                    </div>
                    )}
                    {!localStorage.getItem("token") && (
                        <a className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' href="/login">Se connecter</a>
                    )}  
                </div>
                </section>
        </div>
    );
};

export default Home;