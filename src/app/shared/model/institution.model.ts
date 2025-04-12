export interface Institution {
  id?: string;
  objectId?: string;
  name: string;
  registrationNumber?: string;
  motto?: string;
  description?: string;
  poBox?: string;
  logo?: string;
  emails?: string[];
  phones?: string[];
  isActive?: boolean;
  campus?: Campus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Campus {
  id?: string;
  objectId?: string;
  name: string;
  address?: string;
  sections?: any[];
  educationOfferings?: any[];
  classes?: any[];
  geoPoint?: {
    latitude: number;
    longitude: number;
  };
  municipality?: Municipality;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Municipality {
  id?: string;
  objectId?: string;
  name_fr: string;
  name_en?: string;
  slug?: string;
  code?: string;
  department?: Department;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Department {
  id?: string;
  objectId?: string;
  name_fr: string;
  name_en?: string;
  slug?: string;
  code?: string;
  region?: Region;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Region {
  id?: string;
  objectId?: string;
  name_fr: string;
  name_en?: string;
  slug?: string;
  code?: string;
  country?: Country;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Country {
  id?: string;
  objectId?: string;
  name_fr: string;
  name_en?: string;
  codeISO?: string;
  phoneCode?: string;
  phoneFormat?: string;
  currency?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InstitutionSection {
  id?: string;
  objectId?: string;
  creationDate: Date;
  closingDate?: Date;
  campus?: Campus;
  section?: Section;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Section {
  id?: string;
  objectId?: string;
  name_fr: string;
  name_en?: string;
  slug?: string;
  institutions?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EducationOffering {
  id?: string;
  objectId?: string;
  startDate: Date;
  endDate?: Date;
  campus?: Campus;
  type?: EducationType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EducationType {
  id?: string;
  objectId?: string;
  name_fr: string;
  name_en?: string;
  slug?: string;
  campuses?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InstitutionFilter {
  keyword?: string;
  status?: string;
  campusId?: string;
}

export interface CampusFilter {
  keyword?: string;
  municipalityId?: string;
}

export interface ApiResponse<T> {
  results: T[];
  count: number;
} 