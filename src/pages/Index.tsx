import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const soaps = [
  {
    id: 1,
    name: "Лавандовое мыло",
    description: "Успокаивающее мыло с натуральным маслом лаванды и сушеными цветами",
    image: "/img/f8849d19-9e22-4a1d-94b1-d3c74ba1ef39.jpg",
    price: 450,
    weight: "100г",
    ingredients: ["Масло лаванды", "Сушеная лаванда", "Оливковое масло", "Кокосовое масло"],
    category: "Расслабляющее",
    inStock: true
  },
  {
    id: 2,
    name: "Мыло с медом и овсянкой",
    description: "Питательное мыло для чувствительной кожи с натуральным медом",
    image: "/img/f2d2daf8-6acf-4952-b307-83878f41af7e.jpg",
    price: 380,
    weight: "100г",
    ingredients: ["Натуральный мед", "Овсяные хлопья", "Миндальное масло", "Масло ши"],
    category: "Питательное",
    inStock: true
  },
  {
    id: 3,
    name: "Цитрусовый микс",
    description: "Бодрящее мыло с эфирными маслами апельсина и лимона",
    image: "/img/289c55b5-ac09-4f9f-af76-c13550db3bd5.jpg",
    price: 420,
    weight: "100г",
    ingredients: ["Масло апельсина", "Масло лимона", "Цедра лимона", "Касторовое масло"],
    category: "Бодрящее",
    inStock: true
  }
];

export default function Index() {
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const addToCart = (soapId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === soapId);
      if (existing) {
        return prev.map(item => 
          item.id === soapId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: soapId, quantity: 1 }];
    });
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredSoaps = soaps.filter(soap => 
    selectedCategory === 'Все' || soap.category === selectedCategory
  );

  const categories = ['Все', ...Array.from(new Set(soaps.map(soap => soap.category)))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Icon name="Flower" className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Мыльная мастерская</h1>
                <p className="text-sm text-muted-foreground">Натуральное мыло ручной работы</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative">
                <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                Корзина
                {getCartItemsCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-primary text-primary-foreground">
                    {getCartItemsCount()}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Phone" className="h-4 w-4 mr-2" />
                Контакты
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-secondary/20 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            Натуральное мыло
            <span className="block text-primary">ручной работы</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Создаем уникальное мыло из натуральных ингредиентов без химических добавок
          </p>
          <Button size="lg" className="text-lg px-8 py-6">
            <Icon name="Sparkles" className="h-5 w-5 mr-2" />
            Посмотреть коллекцию
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">Наша коллекция</h3>
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-200"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSoaps.map(soap => (
            <Card key={soap.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card border-border overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={soap.image}
                  alt={soap.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                    {soap.category}
                  </Badge>
                </div>
                {soap.inStock && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-accent/90 text-accent-foreground">
                      В наличии
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-foreground">
                  {soap.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {soap.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{soap.price}₽</span>
                  <span className="text-sm text-muted-foreground">{soap.weight}</span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 text-foreground">Состав:</h4>
                  <div className="flex flex-wrap gap-1">
                    {soap.ingredients.map(ingredient => (
                      <Badge key={ingredient} variant="outline" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => addToCart(soap.id)}
                    disabled={!soap.inStock}
                  >
                    <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                    В корзину
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Heart" className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Eye" className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <section className="mt-20 py-16 bg-secondary/30 rounded-3xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Почему выбирают нас</h3>
            <p className="text-muted-foreground">Качество и забота в каждом кусочке мыла</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Leaf" className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">100% натуральные ингредиенты</h4>
              <p className="text-sm text-muted-foreground">
                Используем только качественные масла и натуральные добавки
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="Heart" className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Ручная работа</h4>
              <p className="text-sm text-muted-foreground">
                Каждое мыло создается вручную с любовью и вниманием к деталям
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Truck" className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Быстрая доставка</h4>
              <p className="text-sm text-muted-foreground">
                Бережная упаковка и доставка по всей России
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Мыльная мастерская</h4>
              <p className="text-sm text-muted-foreground">
                Создаем натуральное мыло ручной работы с 2019 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📞 +7 (999) 123-45-67</p>
                <p>📧 info@soap-workshop.ru</p>
                <p>📍 Москва, ул. Мастерская, 15</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon">
                  <Icon name="Instagram" className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="MessageCircle" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Мыльная мастерская. Сделано с ❤️ для красоты и здоровья</p>
          </div>
        </div>
      </footer>
    </div>
  );
}