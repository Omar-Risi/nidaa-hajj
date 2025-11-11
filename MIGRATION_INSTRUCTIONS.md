# Database Migration Instructions

## Changes Made to Schema

### News Model
Added optional English fields:
- `titleEn` (String, optional)
- `contentEn` (Text, optional)

### UmrahOffer Model
Added optional English fields:
- `titleEn` (String, optional)
- `descriptionEn` (Text, optional)
- `durationEn` (String, optional)
- `accommodationEn` (String, optional)
- `featuresEn` (String array, optional)

## Migration Steps

### 1. Generate Migration
```bash
npx prisma migrate dev --name add_english_fields
```

This will:
- Create a new migration file
- Add the new columns to your database
- All new fields are optional (nullable), so existing records won't be affected

### 2. Update Prisma Client
```bash
npx prisma generate
```

This regenerates the Prisma Client with the new fields.

## Important Notes

✅ **Safe for Production**: All new fields are optional (nullable)
✅ **No Data Loss**: Existing records remain unchanged
✅ **Backward Compatible**: Old records will have NULL for English fields
✅ **Future Ready**: New records can include English translations

## Database Changes

The migration will add these columns:

### news table:
```sql
ALTER TABLE "news" ADD COLUMN "titleEn" TEXT;
ALTER TABLE "news" ADD COLUMN "contentEn" TEXT;
```

### umrah_offers table:
```sql
ALTER TABLE "umrah_offers" ADD COLUMN "titleEn" TEXT;
ALTER TABLE "umrah_offers" ADD COLUMN "descriptionEn" TEXT;
ALTER TABLE "umrah_offers" ADD COLUMN "durationEn" TEXT;
ALTER TABLE "umrah_offers" ADD COLUMN "accommodationEn" TEXT;
ALTER TABLE "umrah_offers" ADD COLUMN "featuresEn" TEXT[] DEFAULT ARRAY[]::TEXT[];
```

## Next Steps

After running the migration:

1. **Update Dashboard Forms** - Add English input fields
2. **Update API Routes** - Handle English fields in POST/PUT requests
3. **Update Frontend Display** - Show English content when language is English
4. **Translate Existing Records** - Gradually add English translations to existing records

## Testing

1. Run migration in development first
2. Verify existing records still display correctly
3. Test creating new records with English fields
4. Test language switching on frontend

## Rollback (if needed)

If you need to rollback:
```bash
npx prisma migrate resolve --rolled-back <migration_name>
```

Then manually remove the columns or create a new migration to drop them.
