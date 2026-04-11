from rest_framework import serializers
from books.models import Book
from authors.models import Author

class BookSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    brief = serializers.CharField()
    image = serializers.ImageField(required=False, allow_null=True)
    no_of_page = serializers.IntegerField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)

    def validate_title(self, value):
        if "forbidden" in value.lower():
            raise serializers.ValidationError("This title is not allowed")
        return value

    def create(self, validated_data):
        return Book.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.brief = validated_data.get('brief', instance.brief)
        instance.image = validated_data.get('image', instance.image)
        instance.no_of_page = validated_data.get('no_of_page', instance.no_of_page)
        instance.price = validated_data.get('price', instance.price)
        instance.save()
        return instance

class BookModelSerializer(serializers.ModelSerializer):
    author_names = serializers.StringRelatedField(source='authors', many=True, read_only=True)

    class Meta:
        model = Book
        fields = '__all__'
