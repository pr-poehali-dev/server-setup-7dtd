import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const mods = [
  {
    id: 1,
    title: "Advanced Weapons Pack",
    description: "Расширенный арсенал футуристического оружия для выживания в постапокалипсисе",
    image: "/img/6e625785-cc1f-49d2-9ee4-fad543bcfd3c.jpg",
    category: "Оружие",
    downloads: "15.2K",
    rating: 4.8,
    tags: ["Оружие", "PvP", "Выживание"]
  },
  {
    id: 2,
    title: "Tech Base Builder",
    description: "Технологичные блоки и структуры для строительства продвинутых баз",
    image: "/img/7c7f1db1-901b-4f53-b9c9-9192fa31c5bc.jpg",
    category: "Строительство",
    downloads: "8.7K",
    rating: 4.6,
    tags: ["Строительство", "Техника", "База"]
  },
  {
    id: 3,
    title: "Enhanced UI Pack",
    description: "Улучшенный интерфейс с киберпанк элементами и продвинутой HUD системой",
    image: "/img/3c646c8b-f232-4473-81de-0c237f96bf23.jpg",
    category: "Интерфейс",
    downloads: "22.1K",
    rating: 4.9,
    tags: ["UI", "HUD", "Киберпанк"]
  }
];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredMods = mods.filter(mod => 
    mod.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'Все' || mod.category === selectedCategory)
  );

  const categories = ['Все', ...Array.from(new Set(mods.map(mod => mod.category)))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Icon name="Cpu" className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">MOD DATABASE</h1>
                <p className="text-sm text-muted-foreground">7 Days to Die - База знаний модов</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Github" className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Settings" className="h-4 w-4 mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Библиотека модов для выживания
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Улучши свой игровой опыт с продвинутыми модами для 7 Days to Die
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск модов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
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

        {/* Tabs */}
        <Tabs defaultValue="mods" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="mods" className="flex items-center space-x-2">
              <Icon name="Package" className="h-4 w-4" />
              <span>Моды</span>
            </TabsTrigger>
            <TabsTrigger value="downloads" className="flex items-center space-x-2">
              <Icon name="Download" className="h-4 w-4" />
              <span>Скачать</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mods">
            {/* Mods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMods.map(mod => (
                <Card key={mod.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card border-border">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={mod.image}
                      alt={mod.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        {mod.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {mod.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {mod.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {mod.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{mod.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Download" className="h-4 w-4" />
                          <span>{mod.downloads}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button className="flex-1" size="sm">
                          <Icon name="Download" className="h-4 w-4 mr-2" />
                          Скачать
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Heart" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="downloads">
            <div className="text-center py-12">
              <div className="mb-6">
                <Icon name="Download" className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Центр загрузок</h3>
                <p className="text-muted-foreground">Скачивайте моды быстро и безопасно</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <Icon name="Zap" className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Быстрая загрузка</h4>
                  <p className="text-sm text-muted-foreground">Высокоскоростные серверы для мгновенного скачивания</p>
                </Card>
                
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <Icon name="Shield" className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Безопасность</h4>
                  <p className="text-sm text-muted-foreground">Все файлы проверены на вирусы и совместимость</p>
                </Card>
                
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <Icon name="Users" className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Сообщество</h4>
                  <p className="text-sm text-muted-foreground">Поддержка и отзывы от игрового сообщества</p>
                </Card>
              </div>
              
              <Button size="lg" className="mt-8">
                <Icon name="Download" className="h-5 w-5 mr-2" />
                Начать загрузку
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 7DTD Mod Database. Создано для сообщества выживших.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}