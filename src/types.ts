export interface IUser {
  code: number; // Código identificador
  password: string; // Contraseña de acceso
  first_name: string; // Nombre
  last_name: string; // Apellido
  career: string; // Carrera profesional
  campus: string; // Campus de estudio
  status: string; // Estado o situación actual
  last_cycle?: string; // Último ciclo académico
  last_cycle_desc?: string; // Descripción del último ciclo
  credits?: number; // Créditos acumulados
  average?: number; // Promedio académico
  email?: string; // Correo electrónico
  whatsapp?: string; // Número de WhatsApp
  english?: boolean; // Habla inglés
  ceneval?: number; // Puntuación en el examen Ceneval
  modular?: string; // Información modular
  social_service?: boolean; // Realizó servicio social
  internship?: boolean; // Realizó prácticas profesionales
  complementary_activities?: string; // Actividades complementarias
  linkedin?: string; // Perfil de LinkedIn
  social_media?: string; // Redes sociales
  emergency_phone?: string; // Número de teléfono de emergencia
  address?: string; // Dirección completa
  allergies?: string; // Alergias conocidas
  blood_type?: string; // Tipo de sangre
  roles?: string[]; // Roles de usuario
}


export interface IAuth {
  loggedIn: boolean;
  user?: IUser;
}