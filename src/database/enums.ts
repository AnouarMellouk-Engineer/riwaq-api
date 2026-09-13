export enum Status {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

export enum PlanName {
  FREE = 'free',
  STANDARD = 'standard',
  PRO = 'pro',
}

export enum FeatureName {
  ADMINS = 'admins',
  STUDENTS = 'students',
  PARENTS = 'parents',
  TEACHERS = 'teachers',
  CLASSES = 'classes',
  NOTIFICATIONS = 'notifications',
  INVOICES = 'invoices',
  CALENDAR = 'calendar',
  ATTENDANCES = 'attendances',
  PAYMENTS = 'payments',
}

export enum PaymentMethod {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  POSTAL_TRANSFER = 'postal_transfer',
}

export enum Role {
  PLATFORM_OWNER = 'platform_owner',
  SCHOOL_OWNER = 'school_owner',
  ADMIN = 'admin',
  TEACHER = 'teacher',
  PARENT = 'parent',
}

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  INVITED = 'invited',
}

export enum ModuleName {
  ARABIC = 'arabic',
  FRENCH = 'french',
  ENGLISH = 'english',
  TAMAZIGHT = 'tamazight',
  ISLAMIC_EDUCATION = 'islamic_education',
  MATHEMATICS = 'mathematics',
  PHYSICS = 'physics',
  NATURAL_SCIENCES = 'natural_sciences',
  HISTORY_GEOGRAPHY = 'history_geography',
  CIVIC_EDUCATION = 'civic_education',
  PHILOSOPHY = 'philosophy',
  COMPUTER_SCIENCE = 'computer_science',
  ART_EDUCATION = 'art_education',
  MUSIC_EDUCATION = 'music_education',
  PHYSICAL_EDUCATION = 'physical_education',
}

export enum Grade {
  PRIMARY = 'primary',
  MIDDLE = 'middle',
  SECONDARY = 'secondary',
}

export enum StudentGender {
  MALE = 'male',
  FEMALE = 'female',
}
