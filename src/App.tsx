import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { AuthProvider } from './contexts/AuthContext';
import ListaTemas from './components/tema/listatemas/ListaTemas';
import FormTema from './components/tema/formtema/FormTema';
import DeletarTema from './components/tema/deletartema/DeletarTema';
import Perfil from './pages/perfil/Perfil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<AuthProvider>
				<ToastContainer />
				<BrowserRouter>
					<Navbar />
					<div className="min-h-[80vh]">
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/login" element={<Login />} />
							<Route path="/home" element={<Home />} />
							<Route path="/cadastro" element={<Cadastro />} />
							<Route path="/temas" element={<ListaTemas />} />
							<Route path="/cadastrartema" element={<FormTema />} />
							<Route path="/editartema/:id" element={<FormTema />} />
							<Route path="/deletartema/:id" element={<DeletarTema />} />
							<Route path="/perfil" element={<Perfil />} />
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;