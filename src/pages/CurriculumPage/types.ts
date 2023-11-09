export interface subjectData {
  clave: string;
  competences: string;
  credits: number;
  id: number;
  module: string;
  name: string;
  total_hours: number;
}

export interface curriculumData {
  clave: string;
  date: string;
  id: number;
  id_user: number;
  name: string;
  subjects: subjectData[];
  total_credits: number;
}

export interface ApiResponse {
  curriculum: curriculumData;
  message: string;
}