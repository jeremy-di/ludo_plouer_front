import React, { useEffect, useMemo, useState } from 'react';
import { archiveService } from '../../_services/archive.service';

const months = [
  { value: '1',  label: '01 - Janvier' },
  { value: '2',  label: '02 - Février' },
  { value: '3',  label: '03 - Mars' },
  { value: '4',  label: '04 - Avril' },
  { value: '5',  label: '05 - Mai' },
  { value: '6',  label: '06 - Juin' },
  { value: '7',  label: '07 - Juillet' },
  { value: '8',  label: '08 - Août' },
  { value: '9',  label: '09 - Septembre' },
  { value: '10', label: '10 - Octobre' },
  { value: '11', label: '11 - Novembre' },
  { value: '12', label: '12 - Décembre' },
];

const ListArchives = () => {
  const [archives, setArchives] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(null);

  // Filtres UI
  const [filters, setFilters] = useState({
    month: '',   // '1'..'12' ou ''
    year: '',    // '2025'.. ou ''
    period: '',  // '' | 'am' | 'pm'
  });

  useEffect(() => {
    archiveService.getAllArchives()
      .then(res => {
        setArchives(res.data || []);
        setLoaded(true);
      })
      .catch(error => {
        console.log(error);
        setErr(error);
        setLoaded(true);
      });
  }, []);

  // Liste des années présentes dans les données (desc)
  const years = useMemo(() => {
    const set = new Set((archives || []).map(a => new Date(a.createdAt).getFullYear()));
    return Array.from(set).sort((a, b) => b - a).map(String);
  }, [archives]);

  // Archives filtrées
  const filteredArchives = useMemo(() => {
    return (archives || []).filter(a => {
      const d = new Date(a.createdAt);
      const m = d.getMonth() + 1;  // 1..12
      const y = d.getFullYear();
      const h = d.getHours();

      const byMonth = !filters.month || m === Number(filters.month);
      const byYear  = !filters.year  || y === Number(filters.year);
      const byPeriod =
        !filters.period ||
        (filters.period === 'am' ? h < 12 : h >= 12);

      return byMonth && byYear && byPeriod;
    });
  }, [archives, filters]);

  // Total d'enfants sur le résultat filtré
  const totalChildren = useMemo(
    () => filteredArchives.reduce((s, a) => s + (Number(a.nbOfChildrens) || 0), 0),
    [filteredArchives]
  );

  const onChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => setFilters({ month: '', year: '', period: '' });

  if (!loaded) {
    return (
      <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101">
          <path d="M100 50.5908 ...Z" />
          <path d="M93.9676 39.0409 ...Z" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (err) {
    return (
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">Erreur :</span> {err?.response?.status} {err?.response?.statusText === "Not Found" && "Aucune ressource trouvée"}
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-4xl text-center mt-5 mb-5'>Archive des inscriptions</h1>

      {/* Barre de filtres */}
      <div className="max-w-5xl mx-auto mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label htmlFor="month" className="block mb-1 text-sm font-medium">Mois</label>
          <select
            id="month"
            name="month"
            value={filters.month}
            onChange={onChangeFilter}
            className="w-full p-2.5 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Tous</option>
            {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="year" className="block mb-1 text-sm font-medium">Année</label>
          <select
            id="year"
            name="year"
            value={filters.year}
            onChange={onChangeFilter}
            className="w-full p-2.5 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Toutes</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="period" className="block mb-1 text-sm font-medium">Période</label>
          <select
            id="period"
            name="period"
            value={filters.period}
            onChange={onChangeFilter}
            className="w-full p-2.5 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Toute la journée</option>
            <option value="am">Matin (00:00–11:59)</option>
            <option value="pm">Après-midi (12:00–23:59)</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={resetFilters}
            type="button"
            className="w-full text-white bg-slate-700 hover:bg-slate-800 rounded-lg px-4 py-2.5"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Résumé des résultats */}
      <div className="max-w-5xl mx-auto mb-4 text-sm text-gray-600 dark:text-black">
        {filteredArchives.length} archive(s) • Total d'enfants : <span className="font-semibold">{totalChildren}</span>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {filteredArchives.map((archive, index) => (
          <div key={index} className="rounded-lg border p-4 bg-white dark:bg-gray-800">
            <div className="flex justify-between">
              <div className="font-semibold text-gray-900 dark:text-white">
                Nom et Prénom : {archive.member?.lastName} {archive.member?.firstName}
              </div>
            </div>
            <div className="mt-1 text-sm text-white">Nombre d'enfants : {archive.nbOfChildrens}</div>
            <div className="mt-1 text-sm text-white">
              Date : {new Date(archive.createdAt).toLocaleString("fr-FR", { year: "numeric", month: "2-digit", day: "2-digit",  hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        ))}
      </div>

      {/* Table desktop */}
      <div className="relative overflow-x-auto hidden md:block">
        <table className="min-w-full text-sm text-left rtl:text-right text-gray-700">
          <thead className="text-xs uppercase text-gray-white">
            <tr>
              <th className="px-6 py-3">Nom et Prénom</th>
              <th className="px-6 py-3">Nombre d'enfants</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArchives.map((archive, index) => (
              <tr key={index} className="bg-white dark:bg-gray-800">
                <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {archive.member?.lastName} {archive.member?.firstName}
                </th>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{archive.nbOfChildrens}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {new Date(archive.createdAt).toLocaleString("fr-FR", { year: "numeric", month: "2-digit", day: "2-digit",  hour: "2-digit", minute: "2-digit" })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <a href={`/member/one/${archive.member._id}`} className="inline-flex items-center justify-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Voir le membre</a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ListArchives;
