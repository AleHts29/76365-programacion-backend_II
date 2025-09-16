// Impoertamos DAO
import BusinessServiceDAO from "../acceso_datos/dao/business.dao.js";
import OrdersServiceDAO from "../acceso_datos/dao/orders.dao.js";
import UsersServiceDAO from "../acceso_datos/dao/users.dao.js";



// Importamos Repository
import BusinessRepository from "../repository/business.repository.js";
import OrdersRepository from "../repository/orders.repository.js";
import UsersRepository from "../repository/users.repository.js";


// Crear instancia de los DAOs
const businessServiceDAO = new BusinessServiceDAO();
const ordersServiceDAO = new OrdersServiceDAO();
const usersServiceDAO = new UsersServiceDAO();


// Exportar los servicios - inyectamos las instancias de los DAOs a los Repositories
export const businessService = new BusinessRepository(businessServiceDAO);
export const ordersService = new OrdersRepository(ordersServiceDAO);
export const usersService = new UsersRepository(usersServiceDAO);