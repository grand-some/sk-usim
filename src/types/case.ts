export interface Case {
  id: string;
  title: string;
  category: string;
  description: string;
  result: string;
  year: string;
  image: string;
  details: {
    client: string;
    issue: string;
    approach: string;
    outcome: string;
  };
} 