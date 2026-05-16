# User Journey Examples

## Example 1: Standard Path (Always Needs ID) ❌➡️✅

**Scenario**: New general user wanting subsidy

### User Actions:
```
1. Opens subsidy form
2. Selects Configuration Path: "Standard Configuration (ID Required)"
3. Selects Quota: "Bureaucrat"
4. Selects Subcategory: "IFS"
5. Selects Relation: "Parents"
6. Clicks "Choose File" to upload ID
```

### System Response:
- **Configuration Message**: "⚠️ Standard Configuration: ID proof is REQUIRED for verification."
- **ID Upload Field**: ✅ VISIBLE (always, no matter what combo)
- **File Input**: Accepts image files (JPG, PNG, etc.)
- **Button State**: "Confirm Request" disabled until valid ID uploaded

### Submission:
- **With Valid ID**: ✅ Form submits successfully
- **Without ID**: ❌ Error message: "Upload ID is required for this configuration"
- **Invalid File**: ❌ Error message: "Please choose a valid image file"

### Result:
```
✅ Direct processing with ID verification
✅ Server validates documents manually
✅ Takes 2-3 business days
```

---

## Example 2: Exceptional Path - ID SKIPPED ✅➡️❌

**Scenario**: Government official (Politician/MLA) requesting as spouse

### User Actions:
```
1. Opens subsidy form
2. Selects Configuration Path: "Exceptional Combinations (May Skip ID)"
3. Selects Quota: "Politician"
4. Selects Subcategory: "MLA"
5. Selects Relation: "Spouse"
6. Selects State: "Tamil Nadu"
```

### System Response:
**Real-Time** (as selections are made):

```
After selecting Quota → State:
┌─────────────────────────────────────────────────────────┐
│ ✅ Exceptional Path verified!                          │
│                                                         │
│ Politician → MLA → Spouse is eligible for DIRECT       │
│ VERIFICATION. No ID proof needed!                      │
└─────────────────────────────────────────────────────────┘
```

- **Configuration Message**: "✅ This exceptional combination bypasses ID verification"
- **ID Upload Field**: ❌ HIDDEN (not shown at all)
- **File Input**: Not visible to user
- **Button State**: "Confirm Request" enabled immediately

### Submission:
- **Click Submit**: ✅ Form submits instantly
- **No ID Required**: Form goes through without any file upload
- **System Verification**: Backend looks up in government database
- **Direct Access**: No manual verification needed

### Result:
```
✅ Instant approval
✅ Automatic verification via system lookup
✅ No documents needed
✅ Immediate subsidy access
```

---

## Example 3: Exceptional Path - ID STILL REQUIRED ⚠️➡️✅

**Scenario**: Government employee (Bureaucrat/IFS) requesting as sibling

### User Actions:
```
1. Opens subsidy form
2. Selects Configuration Path: "Exceptional Combinations (May Skip ID)"
3. Selects Quota: "Bureaucrat"
4. Selects Subcategory: "IFS"
5. Selects Relation: "Sibling"
6. Selects State: "Karnataka"
```

### System Response:
**Real-Time** (as selections are made):

```
After selecting Quota → Relation:
┌────────────────────────────────────────────────────┐
│ ⚠️ This combination is NOT in the exceptional    │
│ list. ID proof is REQUIRED.                      │
│                                                  │
│ Check available exceptional combinations.       │
└────────────────────────────────────────────────────┘
```

- **Configuration Message**: "⚠️ This combination requires ID verification"
- **ID Upload Field**: ✅ VISIBLE (even in exceptional path)
- **File Input**: Shows and requires image
- **Button State**: "Confirm Request" disabled until ID uploaded

### Submission:
- **Without ID**: ❌ Error: "Upload ID is required for this configuration"
- **With Valid ID**: ✅ Form submits successfully
- **Manual Review**: Backend verifies ID documents
- **Standard Processing**: 2-3 business days

### Why?
- User chose Exceptional Path
- But combination (Bureaucrat→IFS→Sibling) not in exempt list
- System requires ID to confirm relationship
- Standard verification process applies

### Result:
```
⚠️ Exceptional path selected but ID still needed
✅ Standard manual verification
✅ 2-3 days processing
```

---

## Example 4: Bureaucrat/IPS/Friends (ID SKIPPED)

**Scenario**: IPS Officer friend requesting subsidy on behalf

### User Actions:
```
1. Selects: "Exceptional Combinations (May Skip ID)"
2. Quota: "Bureaucrat"
3. Subcategory: "IPS"
4. Relation: "Friends"
5. State: "Maharashtra"
```

### System Response:
```
✅ DIRECT VERIFICATION PATH ACTIVATED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bureaucrat → IPS → Friends eligible for direct
verification. No ID proof needed!
```

- **ID Upload**: ❌ Hidden
- **Submit Button**: ✅ Enabled
- **Console Log**: "Exceptional combination - ID SKIPPED"

### Submission:
- **Click Confirm**: ✅ Instant submission
- **Verification**: System queries IPS database
- **Approval**: Automatic
- **Subsidy Access**: Immediate

### Result:
```
✅ Fastest path - Instant approval
✅ Zero document requirements
✅ IPS officer list verification only
```

---

## Example 5: Adding Custom Exception

**Scenario**: Admin adds new exceptional combination

### Admin Actions:
```
1. Scrolls to "Add Exceptional Combination" section
2. Fills fields:
   - Quota: "Other"
   - Subcategory: "MLA"
   - Relation: "Friends"
   - State: "Telangana"
3. Clicks "Add Exception"
```

### System Response:
```
✅ Exception added: Other → MLA → Friends will 
now SKIP ID requirement.
```

- **Storage**: Saved to browser localStorage
- **Persistence**: Remains across page refreshes
- **Availability**: All users see this new combination
- **Effect**: Immediately starts skipping ID for this combo

### Next User Experience:
Future users selecting this exact combination will:
1. See ID field hidden
2. Get direct verification message
3. Submit without uploading ID

### Result:
```
✅ Dynamic combination management
✅ Real-time rule updates
✅ Browser-level persistence
✅ Admin flexibility
```

---

## Comparison Table

| Path | Combo | ID? | Speed | Process | Console Log |
|------|-------|-----|-------|---------|------------|
| Standard | Any | ✅ YES | Slow | Manual | "ID proof required" |
| Exceptional | Politician/MLA/Spouse | ❌ NO | Fast | Auto | "ID SKIPPED" |
| Exceptional | Bureaucrat/IPS/Friends | ❌ NO | Fast | Auto | "ID SKIPPED" |
| Exceptional | Any Other | ✅ YES | Slow | Manual | "ID required" |

---

## Visual Flow Diagram

```
USER BEGINS FORM
        ↓
┌─────────────────────────────────┐
│ Select Configuration Path       │
├─────────────────────────────────┤
│                                 │
│ ① Standard Config ─────→ ID Always Required ✅
│   (Choose this)              Upload file ↓
│                              Submit with ID
│
│ ② Exceptional ────→ Evaluate Combination
│    Combinations
│                     Match? (Politician/MLA/Spouse, etc.)
│                        ↙             ↖
│                      YES             NO
│                        ↓              ↓
│                   ID SKIPPED ✅   ID REQUIRED ⚠️
│                   Auto Verify      Upload file
│                   Submit Now        Submit with ID
│
└─────────────────────────────────┘
        ↓
     SUCCESS
```

---

## Data Flow for Each Path

### Standard Path Data Flow:
```
User Input
    ↓
Validate (ID Required)
    ↓
Check File Valid
    ↓
Upload to Server
    ↓
Manual Verification
    ↓
Database Update
    ↓
2-3 Days Processing
    ↓
Email Notification
```

### Exceptional Path (Skip) Data Flow:
```
User Input
    ↓
Check Combination
    ↓
Match Found? YES
    ↓
Auto Verify via Lookup
    ↓
Database Update
    ↓
Instant Approval
    ↓
Email Notification
```

### Exceptional Path (Not Matched) Data Flow:
```
User Input
    ↓
Check Combination
    ↓
Match Found? NO
    ↓
Require ID (fallback)
    ↓
Manual Verification
    ↓
2-3 Days Processing
```

