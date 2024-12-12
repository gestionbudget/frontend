import { useState, useEffect } from 'react';
import { transactionApi } from './api/axiosConfig';
import { ClipLoader } from 'react-spinners';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('REVENUE');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [editingId, setEditingId] = useState(null);
  
  const [descriptionError, setDescriptionError] = useState('');
  const [dateError, setDateError] = useState('');
  const [loading, setLoading] = useState(false);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  
  useEffect(() => {
    fetchTransactions();
    fetchTotalBalance();
  }, []);
  
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionApi.getAllTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalBalance = async () => {
    try {
      const response = await transactionApi.getTotalBalance();
      setTotalBalance(response.data);
    } catch (error) {
      console.error('Error fetching balance', error);
    }
  };

  const validateDescription = (value) => {
    const letterRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!value.trim()) {
      setDescriptionError('La description est requise');
      return false;
    }
    if (!letterRegex.test(value)) {
      setDescriptionError('La description ne peut contenir que des lettres');
      return false;
    }
    setDescriptionError('');
    return true;
  };

  const validateDate = (value) => {
    if (!value) {
      setDateError('La date est obligatoire');
      return false;
    }
    setDateError('');
    return true;
  };

  const saveTransaction = async () => {
    const isDescriptionValid = validateDescription(description);
    const isDateValid = validateDate(date);

    if (!isDescriptionValid || !isDateValid) {
      return;
    }

    try {
      setLoading(true);
      const transaction = { description, type, amount, date };
      if (editingId) {
        await transactionApi.updateTransaction(editingId, transaction);
      } else {
        await transactionApi.addTransaction(transaction);
      }
      
      // Reset form and fetch updated data
      setEditingId(null);
      setDescription('');
      setType('REVENUE');
      setAmount(0);
      setDate('');
      
      // Refresh transactions and balance
      await fetchTransactions();
      await fetchTotalBalance();
    } catch (error) {
      console.error('Error saving transaction', error);
    } finally {
      setLoading(false);
    }
  };

  const editTransaction = (transaction) => {
    setEditingId(transaction.id);
    setDescription(transaction.description);
    setType(transaction.type);
    setAmount(transaction.amount);
    setDate(formatDateForInput(transaction.date));
  };

  const deleteTransaction = async (id) => {
    try {
      setLoading(true);
      await transactionApi.deleteTransaction(id);
      await fetchTransactions();
      await fetchTotalBalance();
    } catch (error) {
      console.error('Error deleting transaction', error);
    } finally {
      setLoading(false);
    }
  };

  // Le reste du code de rendu reste identique à votre version précédente
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">Gestion des Transactions</h1>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Modifier la Transaction' : 'Ajouter une Transaction'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 md:col-span-4">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    validateDescription(e.target.value);
                  }}
                  placeholder="Description"
                  className={`border rounded p-2 w-full ${descriptionError ? 'border-red-500' : ''}`}
                />
                {descriptionError && (
                  <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
                )}
              </div>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)} 
                className="border rounded p-2 w-full"
              >
                <option value="REVENUE">Revenue</option>
                <option value="DEPENSE">Depense</option>
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="Amount"
                className="border rounded p-2 w-full"
              />
              <div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    validateDate(e.target.value);
                  }}
                  className={`border rounded p-2 w-full ${dateError ? 'border-red-500' : ''}`}
                />
                {dateError && (
                  <p className="text-red-500 text-sm mt-1">{dateError}</p>
                )}
              </div>
            </div>
            <button 
              onClick={saveTransaction} 
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : (editingId ? 'Mettre à jour' : 'Ajouter')}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center my-4">
              <ClipLoader size={50} color="#3498db" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-center">Description</th>
                      <th className="px-4 py-3 text-center">Type</th>
                      <th className="px-4 py-3 text-center">Montant</th>
                      <th className="px-4 py-3 text-center">Date</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-100">
                        <td className="px-4 py-3 text-center">{transaction.description}</td>
                        <td className="px-4 py-3 text-center">{transaction.type}</td>
                        <td className="px-4 py-3 text-center">{transaction.amount}</td>
                        <td className="px-4 py-3 text-center">{formatDateForInput(transaction.date)}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                            onClick={() => editTransaction(transaction)}
                            disabled={loading}
                          >
                            Éditer
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            onClick={() => deleteTransaction(transaction.id)}
                            disabled={loading}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-blue-100 p-4 rounded-lg">
                <h2 className="text-xl font-bold text-blue-800">Solde total: {totalBalance} FCFA</h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;