# UX Writing Reference

## DS-OneBox Content Patterns

Consistent, clear, and helpful microcopy across all DS-OneBox components.

## Button Labels

### DO
```tsx
<Button>Save changes</Button>
<Button variant="destructive">Delete account</Button>
<Button variant="outline">Cancel</Button>
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add item
</Button>
```

### DON'T
- Don't use "Click here" or "Submit" (too generic)
- Don't use "OK" for destructive actions
- Don't combine too many words (>4 words is too long)

### Button Hierarchy
| Action | Label Example | Variant |
|--------|---------------|---------|
| Primary | Save, Create, Add | default |
| Secondary | Cancel, Back, Close | outline |
| Destructive | Delete, Remove, Revoke | destructive |
| Tertiary | View details, Learn more | ghost/link |

## Form Labels and Placeholders

### Labels
```tsx
<FormField>
  <FormLabel>Email address</FormLabel>
  <FormControl>
    <Input type="email" placeholder="you@example.com" />
  </FormControl>
  <FormMessage />
</FormField>
```

### Helper Text
```tsx
<FormField>
  <FormLabel>Password</FormLabel>
  <FormControl>
    <Input type="password" />
  </FormControl>
  <FormDescription>
    Must be at least 8 characters long
  </FormDescription>
  <FormMessage />
</FormField>
```

### Error Messages
```tsx
<FormField state="error">
  <FormMessage>
    Email address is required
  </FormMessage>
</FormField>

<FormField state="error">
  <FormMessage>
    Please enter a valid email address (e.g., name@company.com)
  </FormMessage>
</FormField>

<FormField state="error">
  <FormMessage>
    Password must contain at least 8 characters, including one number
  </FormMessage>
</FormField>
```

## Empty States

### Empty List
```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <EmptyState 
    icon={FileText}
    title="No documents yet"
    description="Upload your first document to get started"
  />
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Upload document
  </Button>
</div>
```

### Empty Search Results
```tsx
<div className="text-center py-12">
  <Search className="mx-auto h-12 w-12 text-muted-foreground" />
  <h3 className="mt-4 text-lg font-semibold">No results found</h3>
  <p className="mt-2 text-muted-foreground">
    Try adjusting your search or filter to find what you're looking for.
  </p>
  <Button variant="outline" className="mt-4">
    Clear filters
  </Button>
</div>
```

### Empty Dashboard
```tsx
<Card>
  <CardHeader>
    <CardTitle>Welcome to your dashboard</CardTitle>
    <CardDescription>
      Get started by adding your first data source
    </CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2 text-sm">
      <li>• Connect your analytics platform</li>
      <li>• Import your customer list</li>
      <li>• Set up your first report</li>
    </ul>
  </CardContent>
</Card>
```

## Toast Notifications

### Success
```tsx
toast.success({
  title: "Changes saved",
  description: "Your profile has been updated successfully.",
})
```

### Error
```tsx
toast.error({
  title: "Something went wrong",
  description: "Please try again or contact support.",
})
```

### Info
```tsx
toast.info({
  title: "New update available",
  description: "Refresh the page to see the latest version.",
})
```

### Action Toast
```tsx
toast({
  title: "Email sent",
  description: "The message was sent to john@example.com",
  action: (
    <ToastAction altText="View email">
      View
    </ToastAction>
  ),
})
```

## Dialog Titles and Descriptions

### Confirmation Dialog
```tsx
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete document?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. The document "Q4 Report.pdf" will be permanently removed.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Form Dialog
```tsx
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create new project</DialogTitle>
      <DialogDescription>
        Projects help you organize related documents and tasks.
      </DialogDescription>
    </DialogHeader>
    <CreateProjectForm />
  </DialogContent>
</Dialog>
```

## Badge and Label Patterns

### Status Badges
```tsx
<Badge variant="default">Draft</Badge>
<Badge variant="secondary">Pending review</Badge>
<Badge variant="outline">Archived</Badge>
<Badge variant="destructive">Rejected</Badge>
<Badge className="bg-green-500">Active</Badge>
```

### Count Badges
```tsx
<Button>
  Notifications
  <Badge variant="secondary" className="ml-2">12</Badge>
</Button>
```

## Table Content

### Headers
- Use clear, single nouns or noun phrases
- Capitalize first letter only (sentence case)
- Avoid abbreviations unless universally known

### Empty Cells
```tsx
<td className="text-muted-foreground">—</td>
```

### Loading State
```tsx
<td>
  <Skeleton className="h-4 w-20" />
</td>
```

## Error Pages

### 404 Page
```tsx
<div className="flex flex-col items-center justify-center min-h-[400px] text-center">
  <h1 className="text-6xl font-bold">404</h1>
  <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
  <p className="mt-2 text-muted-foreground">
    The page you're looking for doesn't exist or has been moved.
  </p>
  <Button asChild className="mt-6">
    <Link href="/">Go to homepage</Link>
  </Button>
</div>
```

### Error Boundary
```tsx
<div className="flex flex-col items-center justify-center p-8 text-center">
  <Alert variant="destructive" className="max-w-md">
    <AlertTitle>Something went wrong</AlertTitle>
    <AlertDescription>
      We're sorry, but something unexpected happened. Our team has been notified.
    </AlertDescription>
  </Alert>
  <Button onClick={() => window.location.reload()} className="mt-4">
    Try again
  </Button>
</div>
```

## Loading States

### Inline Loading
```tsx
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Saving...
</Button>
```

### Skeleton Text
```tsx
<div className="space-y-2">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>
```

## Accessibility Text

### Screen Reader Only
```tsx
<span className="sr-only">
  (Opens in new window)
</span>

<VisuallyHidden>
  Close dialog
</VisuallyHidden>
```

### Required Field Indicator
```tsx
<FormField>
  <FormLabel>
    Email address
    <span className="text-destructive ml-1">*</span>
  </FormLabel>
</FormField>
```

## Writing Rules

### DO
- Use clear, concise language
- Write in second person ("you", "your")
- Use sentence case for titles and labels
- Front-load important information
- Be specific in error messages
- Use active voice

### DON'T
- Don't use jargon or technical terms without context
- Don't use all caps for emphasis
- Don't use "Click here" or "Submit"
- Don't be vague in error messages
- Don't use "N/A" — explain why it's not applicable
- Don't use exclamation marks excessively (!)

## Integration with DS-OneBox Skills

- **FORMS.md**: Form validation messages, helper text patterns
- **FEEDBACK.md**: Toast content guidelines
- **LAYOUT.md**: Dialog titles, empty states
- **RESOLVER.md**: Content hierarchy rules
