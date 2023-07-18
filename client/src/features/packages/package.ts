export interface packageType {
  packageName: string;
  packagePrice: Number;
}

const eventPackages: packageType[] = [
  { packageName: "חאלקה", packagePrice: 1000 },
  { packageName: "גיל שנה", packagePrice: 1200 },
  { packageName: "בת מיצווה", packagePrice: 1000 },
  { packageName: "משפחה", packagePrice: 1500 },
];

export default eventPackages;
