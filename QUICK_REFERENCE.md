# Quick Reference - ID Verification Configuration System

## 🎯 Two Pathways

### PATH 1: Standard Configuration
- **ID Required**: YES (Always)
- **What Happens**: User uploads ID proof document
- **Status Message**: "⚠️ ID proof is REQUIRED"
- **Form Submission**: Only with valid ID image

### PATH 2: Exceptional Combinations  
- **ID Required**: NO (For qualifying combinations)
- **What Happens**: System uses direct verification (database lookup)
- **Status Message**: "✅ Direct verification - No ID needed"
- **Form Submission**: Immediate without ID upload

---

## ✅ ID-Exempt Combinations (Direct Verification)

```
Politician → MLA → Spouse        → NO ID NEEDED ✅
Politician → MLA → Friends       → NO ID NEEDED ✅
Politician → IAS → Spouse        → NO ID NEEDED ✅
Bureaucrat → IPS → Spouse        → NO ID NEEDED ✅
Bureaucrat → IPS → Friends       → NO ID NEEDED ✅
Bureaucrat → IAS → Spouse        → NO ID NEEDED ✅
```

---

## ⚠️ Combinations Requiring ID

All other combinations in the form require ID upload, such as:
- Politician → IFS → Parents
- Bureaucrat → IAS → Friends
- Other → Any subcategory → Any relation
- Any combination NOT in the exempt list above

---

## 🔄 How Selection Works

1. **User opens form**
2. **Selects Path**: 
   - Standard → ID always required
   - Exceptional → ID conditionally skipped
3. **Selects Quota** (Politician/Bureaucrat/Other)
4. **Selects Subcategory** (IFS/IAS/IPS/MLA)
5. **Selects Relation** (Parents/Spouse/Sibling/Friends)
6. **System evaluates**:
   - ✅ If in exempt list → Hide ID upload
   - ⚠️ If NOT in list → Show ID upload
7. **Submit** based on ID requirement

---

## 📝 Code Files Modified

| File | Changes |
|------|---------|
| `subsidy.html` | Added config path selector + info display |
| `script.js` | Rewrote combination logic + validation |
| `style.css` | Added config-info styling |
| `SYSTEM_EXPLANATION.md` | NEW - Full documentation |

---

## 🧪 Testing Checklist

- [ ] Select Standard Path → ID field appears
- [ ] Select Exceptional + Politician/MLA/Spouse → ID field hides
- [ ] Select Exceptional + Politician/IFS/Parents → ID field appears
- [ ] Check browser console for "ID SKIPPED" message
- [ ] Try submitting form without ID (when hidden)
- [ ] Try submitting with invalid image file
- [ ] Add custom exception via "Add Exception" button
- [ ] Verify localStorage persistence

---

## 🛠️ Add Custom Exceptional Combination

1. Scroll to "Add Exceptional Combination" section
2. Fill all fields (Quota, Subcategory, Relation, State)
3. Click "Add Exception" button
4. Message shows: "✅ Exception added: [details]"
5. Combination now skips ID requirement
6. Persists in browser localStorage

---

## 🐛 Debugging

Open browser DevTools (F12) → Console:

```javascript
// Look for these messages:
"Standard configuration: ID proof required"
"Exceptional combination - ID SKIPPED"
"Exceptional path selected but combination requires ID"
```

---

## 📊 Decision Matrix

| Configuration | Quota | Subcategory | Relation | ID Required? |
|---------------|-------|-------------|----------|--------------|
| Standard | Any | Any | Any | ✅ YES |
| Exceptional | Politician | MLA | Spouse | ❌ NO |
| Exceptional | Politician | MLA | Friends | ❌ NO |
| Exceptional | Politician | IAS | Spouse | ❌ NO |
| Exceptional | Bureaucrat | IPS | Spouse | ❌ NO |
| Exceptional | Bureaucrat | IPS | Friends | ❌ NO |
| Exceptional | Bureaucrat | IAS | Spouse | ❌ NO |
| Exceptional | Any Other | Any | Any | ✅ YES |

---

## 💾 Data Storage

- **Predefined Combinations**: Hardcoded in `script.js`
- **User-Added Combinations**: Stored in browser `localStorage`
- **Session**: Persists across page refreshes
- **Clear**: Browser → Settings → Clear browsing data

---

## 🎨 Visual Indicators

- **Config Info Box**: Yellow background with border (info message)
- **Eligibility Message**: Green background (when ID skipped)
- **Warning**: Red/pink background (when ID required)
- **Hidden Elements**: `display: none` (ID upload field hidden)

